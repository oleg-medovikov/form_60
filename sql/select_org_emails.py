import pandas as pd 
from config import engine
from .write_styling_excel_file  import write_styling_excel_file
from .get_identificator import get_identificator

async def select_org_emails(user):
    sql = f"""select email,
                organization as 'Организация',
                comment as 'Комментарий' 
            from org_email
            where identificator = {await get_identificator(user)}"""
    df = pd.read_sql(sql,engine)
    write_styling_excel_file('temp/org_emails.xlsx', df, 'emails')
    return 'temp/org_emails.xlsx'

