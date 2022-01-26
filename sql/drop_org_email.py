import pandas as pd 
from config import DB_EXECUTE
from sql import get_identificator

async def drop_org_email(user) -> str:
    sql=f"delete from org_email where identificator = {get_identificator(user_id)}"
    await DB_EXECUTE(sql)
    return "Успешно очищена таблица org_email"

