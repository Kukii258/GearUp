release: python manage.py migrate
web: gunicorn config.wsgi:application
web: gunicorn gearup.wsgi --log-file -
