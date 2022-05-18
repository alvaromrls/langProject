FROM alpine:3.9

# RUN apt-get clean \
#     && apt-get -y update

# RUN apt-get -y install \
#     nginx \
#     python3-dev \
#     build-essential

RUN apk add --update python3

RUN apk add python3-dev build-base gcc linux-headers libffi-dev

RUN pip3 install --upgrade pip

WORKDIR /usr/src/app

COPY requirements.txt ./

EXPOSE 5000

RUN pip3 install --no-cache-dir -r requirements.txt
RUN pip3 install uwsgi==2.0.18

COPY code ./



RUN addgroup -S uwsgi
RUN adduser -H -D -S uwsgi
USER uwsgi

# uwsgi --ini /opt/uwsgi/uwsgi.ini &

CMD [ "uwsgi", "--ini", "uwsgi.ini" ,"--lazy"]

# CMD [ "python3", "run.py" ]
