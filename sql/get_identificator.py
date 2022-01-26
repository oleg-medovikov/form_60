from config import DB_QUERY, DB_EXECUTE

async def get_identificator(user) -> int:
    if isinstance(user, int):
        sql= f"select identificator from groups where user_id = {user}" 
    else:
        sql= f"select identificator from groups where user_id = {user.id}" 
    
    res = await DB_QUERY(sql)
    if len(res) == 0:
        sql=f"""insert into groups 
                    (user_id,first_name,second_name,identificator)
                    values ({user.id},
                    '{user.first_name}',
                    '{user.last_name}'
                    ,{user.id})"""
        print(sql)
        await DB_EXECUTE(sql)
        return user.id
    else:
        return res[0][0]
    
