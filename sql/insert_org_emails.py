import pandas as pd 
from config import DB_EXECUTE, engine
from .get_identificator import get_identificator

async def insert_org_emails(user_id, df):
    
    df.columns = ['email', 'organization', 'comment']
    df['identificator'] = await get_identificator(user_id)
    sql = f"delete from org_email where identificator = {user_id}"
    
    await DB_EXECUTE(sql)

    df.to_sql('org_email', engine, if_exists='append',index=False)
