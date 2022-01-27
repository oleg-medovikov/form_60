from flask import Flask, render_template , request

from config import DB_QUERY
from sql    import get_identificator
from clas   import pachient

app = Flask(__name__)

@app.route('/', methods=['post','get'])
async def index():
    ID = request.args.get('id')
    identificator = await get_identificator(int(ID))
    # Если неправильный id в адресе, то выдаём ошибку
    if identificator == 0:
        return render_template(
                'error_no_id.html',
                name='error',
                )
    # Ищем имя и фамилию юзера в базе
    sql = f"""select first_name,second_name
                from groups
                    where user_id={int(ID)}"""

    res = await DB_QUERY(sql)
    username = str(res[0][0]) + ' ' +  str(res[0][1])
    
    # Ищем пациента в базе по снилсу
    if request.method == 'POST':
        SNILS = request.form.get('snils')
        PACHIENT = await pachient.find_pachient(identificator, SNILS)
        if PACHIENT == 0:
            # если не нашли, то предлагаем форму заполнения
            print(0)
        else:
            # если нашли, то выводим данные на экран
            print(1)
        

    # отправляем форму приветствия
    return render_template(
            'index.html',
            name='main',
            identificator=identificator,
            username=username,
            )


def web_form():
    app.run(
            host='0.0.0.0',
            port='8443',
            ssl_context=('web/oleg.crt', 'web/oleg.key'))

