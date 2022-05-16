FROM python:3

RUN apt-get clean \
    && apt-get -y update

RUN apt-get -y install \
    nginx \
    python3-dev \
    build-essential

WORKDIR /usr/src/app

COPY requirements.txt ./
COPY code ./

EXPOSE 5000

RUN pip install --no-cache-dir -r requirements.txt

CMD [ "python", "run.py" ]
