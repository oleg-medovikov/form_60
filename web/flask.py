from flask import Flask, render_template , request

from config import DB_QUERY
from sql    import get_identificator

app = Flask(__name__)

@app.route('/', methods=['post','get'])
async def index():
    ID = request.args.get('id')
    identificator = await get_identificator(int(ID))
    if identificator == 0:
        return render_template(
                'error_no_id.html',
                name='error',
                )

    sql = f"select first_name, second_name from groups where user_id={int(ID)}"
    print(sql)
    res = await DB_QUERY(sql)
    print(res)
    username = str(res[0][0]) + ' ' +  str(res[0][1])
    return render_template(
            'index.html',
            name='main',
            identificator=identificator,
            username=username)


def web_form():
    app.run(
            host='0.0.0.0',
            port='8443',
            ssl_context=('web/oleg.crt', 'web/oleg.key'))

