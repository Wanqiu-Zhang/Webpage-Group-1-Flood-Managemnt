#!/usr/bin/env python3
import cgitb
import cx_Oracle
cgitb.enable()
from jinja2 import Environment, FileSystemLoader

def print_html():
    env = Environment(loader=FileSystemLoader('.'))
    temp = env.get_template('../map.html')
    inresults=queryHtml()
    print(temp.render(results = inresults))

def queryHtml():
    with open("password",'r') as pwf:
        pw = pwf.read().strip()
    conn = cx_Oracle.connect(dsn="geoslearn",user="s2312383",password=pw)
    c = conn.cursor()
    # Need to transfer table name from map.html to replace
    c.execute("SELECT * FROM GREENSPACE")
    html = ''
    for row in c:
        html = html + row[0] + " - " + row[1] + " - " + row[2] + '<br>'
    conn.close()
    return html

if __name__ == '__main__':
    print_html()
