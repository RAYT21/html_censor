FROM python:3.11

RUN mkdir /work

COPY . /work

WORKDIR /work

RUN pip install flask
RUN pip install flask-restx requests
RUN pip install flask-cors 
RUN pip install pymorphy3
RUN pip install psycopg2-binary
RUN pip install multipledispatch

