import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
const COOKIE="lihi_streak_game";
export type StreakState={score:number;startedAt:number;questionId:string|null;used:string[]};
function secret(){return process.env.SUPABASE_SERVICE_ROLE_KEY||process.env.LEADERBOARD_ACCESS_CODE||"1312"}
function sign(value:string){return createHmac("sha256",secret()).update(value).digest("base64url")}
export async function readGame():Promise<StreakState|null>{const raw=(await cookies()).get(COOKIE)?.value;if(!raw)return null;const [data,signature]=raw.split(".");if(!data||!signature)return null;const expected=sign(data);if(signature.length!==expected.length||!timingSafeEqual(Buffer.from(signature),Buffer.from(expected)))return null;try{return JSON.parse(Buffer.from(data,"base64url").toString())}catch{return null}}
export async function writeGame(state:StreakState|null){const jar=await cookies();if(!state){jar.delete(COOKIE);return}const data=Buffer.from(JSON.stringify(state)).toString("base64url");jar.set(COOKIE,`${data}.${sign(data)}`,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:60*60})}
