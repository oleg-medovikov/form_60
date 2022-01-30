from flask import Flask, render_template , request, jsonify, make_response

from config import DB_QUERY
from sql    import get_identificator
from clas   import pch

app = Flask(__name__)

 
@app.route('/', methods=['GET'])
async def find_snils():
    if request.method == 'GET':
        ID = request.args.get('id')
        try:
            identificator = await get_identificator(int(ID))
        except:
            return render_template(
                    'error_no_id.html',
                    name='error',
                    )
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

        # отправляем форму приветствия
        return render_template(
                'search_snils.html',
                name='search_snils',
                identificator=identificator,
                username=username,
                )
@app.route('/', methods=['POST'])
async def create_pachient():
    if request.method == 'POST':
        SNILS = request.form['snils']
        ID = request.form['id']
        #print(SNILS,ID)
        # Ищем пациента по снилс
        res = await pch.find_pachient(ID,SNILS)
        if res == 0:
            make_response(jsonify(""), 404)
        else:
            make_response(jsonify(res), 200)

        return render_template(
                'create_pachient.html',
                name='create_pachient',
                snils=SNILS,
                identificator=ID
                )

def web_form():
    app.run(
            host='0.0.0.0',
            port='8443',
            ssl_context=('web/oleg.crt', 'web/oleg.key'))

