FROM python:3.8.4-slim-buster

RUN mkdir /work

COPY . /work

WORKDIR /work

RUN pip install flask
RUN pip install flask-restx requests
RUN pip install flask-cors 
RUN pip install pymorphy2

