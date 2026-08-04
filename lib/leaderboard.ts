import { cookies } from "next/headers";

export type Leader = { display_name:string; best_score:number; total_attempts:number; best_average_time_ms:number; achieved_at:string };
const COOKIE="lihi_leaderboard_name";
export async function playerName(){const value=(await cookies()).get(COOKIE)?.value;return value?decodeURIComponent(value):null}
export async function setPlayerName(name:string){(await cookies()).set(COOKIE,encodeURIComponent(name),{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:60*60*24*30})}
function config(){const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!url||!key)throw new Error("Supabase is not configured");return{url,key}}
async function request(path:string,init?:RequestInit){const{url,key}=config();const response=await fetch(`${url}/rest/v1/${path}`,{...init,headers:{apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json",Prefer:"return=representation",...init?.headers},cache:"no-store"});if(!response.ok)throw new Error(`Database request failed: ${response.status}`);return response.json()}
export async function top10():Promise<Leader[]>{return request("leaderboard_top10?select=*&limit=10")}
export async function recordAttempt(input:{display_name:string;score:number;total_time_ms:number;average_time_ms:number;failed_question_id:string}){return request("rpc/record_streak_attempt",{method:"POST",body:JSON.stringify({p_display_name:input.display_name,p_score:input.score,p_total_time_ms:input.total_time_ms,p_average_time_ms:input.average_time_ms,p_failed_question_id:input.failed_question_id})})}
export function databaseReady(){return Boolean(process.env.SUPABASE_URL&&process.env.SUPABASE_SERVICE_ROLE_KEY)}
