from __future__ import print_function
from flask import Flask,jsonify,request
from calc import calc
from flask_cors import CORS
# from flask_restx import Api, Resource, reqparse
# from flask_restplus import Api, Resource, reqparse

API_VERSION = "1.1.0"

api = Flask(__name__)
CORS(api)
# api = Api(
#     app,
#     version=API_VERSION,
#     title="Flask backend api",
#     description="The backend api system for the Electron Vue app",
#     doc="/docs",
# )


# @api.route("/api_version", endpoint="apiVersion")
# class ApiVersion():
#     def get(self):
#         return API_VERSION


# @api.route("/echo", endpoint="echo")
# class HelloWorld():
#     @api.response(200, "Success")
#     @api.response(400, "Validation Error")
#     def get(self):
#         return "Server active!!"


# Request parser documentation can be found here: https://flask-restx.readthedocs.io/en/latest/parsing.html

# calculator = api.namespace("calculator", description="Calculator operations")


# @calculator.route("/add", endpoint="addition")


    # @calculator.doc(
    #     responses={200: "Success", 400: "Validation error"},
    #     params={"expression": "Formula to compute"},
    # )


@api.route('/add', methods=['POST'])
def post_method():
    data = request.get_json()  # 获取前端传递过来的JSON数据
    # 在这里处理你的数据
    formula=data["expression"]
    args=calc(formula)
    
    return jsonify({'message': str(args)})
        
@api.route('/api', methods=['GET'])
def get_message():
    return jsonify({'message': 'Welcome to our API'})

# 5000 is the flask default port. You can change it to something else if you want.
# Remove `debug=True` when creating the standalone pyinstaller file
if __name__ == "__main__":
    api.run(host="127.0.0.1", port=5000)
    # app.run(host="127.0.0.1", port=5000, debug=True)
