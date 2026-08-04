import{NextResponse}from"next/server";import{databaseReady,playerName,top10}from"../../../lib/leaderboard";
export async function GET(){const name=await playerName();if(!name)return NextResponse.json({name:null,leaders:[],configured:databaseReady()});try{return NextResponse.json({name,leaders:await top10(),configured:true})}catch{return NextResponse.json({name,leaders:[],configured:false})}}
