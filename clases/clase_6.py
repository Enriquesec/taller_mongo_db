# Conexión (MongoDB Atlas o local)
client = MongoClient("mongodb+srv://usuario:contraseña@cluster.mongodb.net/

taller_nosql?retryWrites=true&w=majority")
db = client["taller_nosql"]
coleccion = db["usuarios"]

# INSERT
usuario = {"nombre": "Ana", "edad": 28, "ciudad": "Madrid"}
res = coleccion.insert_one(usuario)
print("ID insertado:", res.inserted_id)

# READ
todos = list(coleccion.find({}))
for doc in todos:
	print(doc)

# UPDATE
coleccion.update_one({"_id": res.inserted_id}, {"$set": {"ciudad": "Sevilla"}})

# DELETE
coleccion.delete_one({"_id": res.inserted_id})

client.close()