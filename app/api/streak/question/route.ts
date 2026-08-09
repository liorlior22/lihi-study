import{NextResponse}from"next/server";
import{playerName}from"../../../../lib/leaderboard";
import{questionMap,streakQuestions}from"../../../../lib/exams";
import{readGame,writeGame,type StreakState}from"../../../../lib/streak-session";

const DISPLAY_IDS=["א","ב","ג","ד","ה","ו","ז","ח"];

function shuffledOrder(q:(typeof streakQuestions)[number],lastCorrectSlot?:number|null){
  const order=q.options.map(option=>option.id);
  for(let i=order.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [order[i],order[j]]=[order[j],order[i]];
  }
  let correctSlot=order.indexOf(q.correctAnswer);
  if(order.length>1&&lastCorrectSlot!=null&&correctSlot===lastCorrectSlot){
    const alternatives=order.map((_,index)=>index).filter(index=>index!==correctSlot);
    const target=alternatives[Math.floor(Math.random()*alternatives.length)];
    [order[correctSlot],order[target]]=[order[target],order[correctSlot]];
    correctSlot=target;
  }
  return{order,correctSlot};
}

function publicQuestion(q:(typeof streakQuestions)[number],game:StreakState){
  const order=game.optionOrder?.length===q.options.length?game.optionOrder:q.options.map(option=>option.id);
  const options=order.map((originalId,index)=>({
    id:DISPLAY_IDS[index]??String(index+1),
    text:q.options.find(option=>option.id===originalId)?.text??""
  }));
  return{id:q.id,question:q.question,subject:q.subject,topic:q.topic,options,timeLimit:60,score:game.score,lives:game.lives,bankSize:streakQuestions.length};
}

export async function POST(request:Request){
  if(!await playerName())return NextResponse.json({error:"נדרשת כניסה"},{status:401});
  const{restart=false}=await request.json().catch(()=>({}));
  let game=restart?null:await readGame();
  if(!game)game={score:0,lives:5,startedAt:Date.now(),questionId:null,used:[],lastSubject:null,lastCorrectSlot:null};
  game.lives=game.lives??5;

  if(game.questionId){
    const existing=questionMap.get(game.questionId);
    if(existing){
      if(!game.optionOrder?.length){
        const shuffled=shuffledOrder(existing,game.lastCorrectSlot);
        game.optionOrder=shuffled.order;
        game.lastCorrectSlot=shuffled.correctSlot;
        await writeGame(game);
      }
      return NextResponse.json(publicQuestion(existing,game));
    }
  }

  let pool=streakQuestions.filter(q=>!game!.used.includes(q.id)&&q.subject!==game!.lastSubject);
  if(!pool.length){
    const unused=streakQuestions.filter(q=>!game!.used.includes(q.id));
    pool=unused.length?unused:streakQuestions.filter(q=>q.subject!==game!.lastSubject);
  }
  if(!pool.length){
    game.used=[];
    pool=streakQuestions;
  }

  const q=pool[Math.floor(Math.random()*pool.length)];
  const shuffled=shuffledOrder(q,game.lastCorrectSlot);
  game.questionId=q.id;
  game.optionOrder=shuffled.order;
  game.lastCorrectSlot=shuffled.correctSlot;
  game.used.push(q.id);
  game.lastSubject=q.subject;
  await writeGame(game);
  return NextResponse.json(publicQuestion(q,game));
}
