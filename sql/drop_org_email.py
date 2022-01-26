import pandas as pd 
from config import DB_EXECUTE

async def drop_org_email(user_id:int) -> str:
    sql=f"delete from org_email where user_id = {user_id}"
    await DB_EXECUTE(sql)
    return "Успешно очищена таблица org_email"

