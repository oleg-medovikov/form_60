from config import DB_QUERY, DB_EXECUTE

async def get_identificator(user_id:int) -> int:
    sql= f"select identificator from groups where user_id = {user_id}" 
    res = await DB_QUERY(sql)
    if len(res) == 0:
        sql=f"insert into groups (user_id,identificator) values ({user_id}, {user_id})"
        await DB_EXECUTE(sql)
        return user_id
    else:
        return res[0][0]
    
