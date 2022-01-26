import time

def hello_message(user) -> str:
    temp = int(time.strftime("%H"))
    hello =  {
     0   <= temp   < 6  :  'Доброй ночи, ',
     6   <= temp   < 11 :  'Доброе утро, ',
     11  <= temp   < 16 :  'Добрый день, ',
     16  <= temp   < 22 :  'Добрый вечер, ',
     22  <= temp   < 24 :  'Доброй ночи, '
            }[True] + str(user.first_name) + ' ' + str(user.last_name)

    text = f"""
    <b> {hello} </b> \n 
    Этот бот должен облегчить занесение данных по форме 60. Команды для работы со справочником организаций: \n
    <b> org_emails </b>  чтобы получить файл с почтой МО 
    <b> email X </b> найти почту МО по части названия 
    <b> current_id </b> узнать свой текущий индентификатор группы
    <b> change_id X</b> поменять текущий идентификатор на Х (любое целое число)
    """
    return text
