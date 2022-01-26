from flask import *


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html',name='main')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='8443',\
            ssl_context=('oleg.crt', 'oleg.key'))
