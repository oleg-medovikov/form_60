import pandas as pd 
from config import DB_EXECUTE, engine
from .get_identificator import get_identificator

async def insert_org_emails(user, df):
    
    df.columns = ['email', 'organization', 'comment']
    identificator = await get_identificator(user)
    df['identificator'] = identificator
    sql = f"delete from org_email where identificator = {identificator}"
    
    await DB_EXECUTE(sql)

    df.to_sql('org_email', engine, if_exists='append',index=False)
