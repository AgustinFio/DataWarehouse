
const express = require('express');
const server = express();
const db = require('./db.js')
const bodyParser = require ('body-parser');
server.set('port', process.env.PORT || 3000);
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Funcion que crea regiones//
async function createRegion(req) {
    await db.sequelize.query(
      "INSERT INTO region (`region_name`) VALUES (:region_name)",
      {
        replacements: {
            id: req.body.id,
        region_name: req.body.region_name
        },
        type: db.sequelize.QueryTypes.INSERT,
      }
    );
  }
  //Funcion que crea paises//
async function createCountry(req) {
    await db.sequelize.query(
      "INSERT INTO countries (`region_id`, `country_name`) VALUES (:region_id, :country_name)",
      {
        replacements: {
            id: req.body.id,
            region_id: req.body.region_id,
        country_name: req.body.country_name
        },
        type: db.sequelize.QueryTypes.INSERT,
      }
    );
  }
  //Funcion que crea ciudades//
async function createCity(req) {
    await db.sequelize.query(
      "INSERT INTO cities (`country_id`, `city_name`) VALUES (:country_id, :city_name)",
      {
        replacements: {
            id: req.body.id,
            country_id: req.body.country_id,
        city_name: req.body.city_name
        },
        type: db.sequelize.QueryTypes.INSERT,
      }
    );
  }
  //Funcion que obtiene paises//
  async function obtenerPaises () {
    const tableCountries = await db.sequelize.query("SELECT region.region_name, countries.country_name, cities.city_name FROM countries INNER JOIN region ON countries.region_id = region.region_id INNER JOIN cities ON countries.country_id = cities.country_id", {
        type: db.sequelize.QueryTypes.SELECT,
      });
      return tableCountries;

} 
//Endpoint que obtiene todas las regiones con sus respectivos paises y ciudades///
server.get('/country',  async (req, res) => {
    try{
        const sendCountries = await obtenerPaises(req)
        res.status(200)
        res.send(sendCountries);
        
        }
        catch (err) {
            console.log(err);
            res.status(500)
            res.send("Algo salio mal..")
        }
});
//Endpoint que crea regiones//
server.post('/region', async(req, res) => {
    try {
        await createRegion(req);
        res.send("Pais creado");
        res.status(200);
    }
    catch (err) {
        res.status(500)
        res.send("Algo salio mal..");
    }
})
//Endpoint que crea paises//
server.post('/country', async(req, res) => {
    try {
        await createCountry(req);
        res.send("Pais creado");
        res.status(200);
    }
    catch (err) {
        res.status(500)
        res.send("Algo salio mal..");
    }
})
//Endpoint que crea ciudades//
server.post('/city', async(req, res) => {
    try {
        await createCity(req);
        res.send("Pais creado");
        res.status(200);
    }
    catch (err) {
        res.status(500)
        res.send("Algo salio mal..");
    }
})
// server.put('/region/:id', async (req, res) => {

    
// })
// server.put('/country/:id', async (req, res) => {
//     //Actualizar informacion de un pais por su ID
// })
// server.put('/city/:id', async (req, res) => {
//     //Actualizar informacion de una ciudad por su ID
// })

//Funcion que elimina region por su id//
async function deleteRegion(id) {
    await db.sequelize.query("DELETE FROM region WHERE region_id = :id", {
      replacements: { id: id },
      type: db.sequelize.QueryTypes.DELETE,
    });
  }
async function deleteCountry(id) {
    await db.sequelize.query("DELETE FROM countries WHERE country_id = :id", {
      replacements: { id: id },
      type: db.sequelize.QueryTypes.DELETE,
    });
  }
server.delete('/region/:id', async (req, res) => {
    //Eliminar region por su ID
    let region_id = req.params.id;
    try{
        deleteRegion(region_id)
        res.send("Region deleted successfully")
    }
    catch (err) {
        console.log("Hubo un error con tu peticion")
    }
})
server.delete('/country/:id', async (req, res) => {
    //Eliminar pais por su ID
    let country_id = req.params.id;
    try{
        deleteCountry(country_id)
        res.send("Country deleted successfully")
    }
    catch (err) {
        console.log("Hubo un error con tu peticion")
    }

})
server.delete('/city/:id', async (req, res) => {
    //Eliminar pais por su ID
})

server.post('/registro', async (req, res) => {
//     const { username, password, fullName, email, deliveryAddress, phone } = req.body
//     if (username.length <= 4) {
//         res.status(400);
//         res.json("username invalido");
//         return
//     }
//     try {
//         if (username && password && fullName && email && deliveryAddress && phone) {
//         var respuesta = await db.sequelize.query('INSERT INTO `users` (username, password, full_name, email, phone, delivery_address) VALUES (:username, :password, :full_name, :email, :phone, :delivery_address)', {
//             replacements: {
//                 username: username,
//                 password: password,
//                 full_name: fullName,
//                 email: email,
//                 phone: phone,
//                 delivery_address: deliveryAddress
//             }
//         });
//         res.status(200)
//     res.json(respuesta);
//     }
//     else {
//         res.status(400)
//         res.send("Debe proporcionar todos los campos correspondientes")
//     }
// }
//     catch (err) {
//         console.log(err);
//         res.status(500)
//         res.send("Algo salio mal..")
        
//     }
});

server.post('/login', async (req, res) => {
    // const { username, password } = req.body;

    // try{
    // const identificarUsuario = await db.sequelize.query('SELECT username, user_id, admin FROM `users` WHERE username = :username AND password = :password ', {
    //     type: db.sequelize.QueryTypes.SELECT,
    //     replacements: {
    //         username: username,
    //         password: password
    //     }

    // })
    // if (identificarUsuario.length === 0) {
    //     res.status(404)
    //     res.send("No se encontro el usuario");
    //     return
    // }
    // else {
    //     const token = jwt.sign(identificarUsuario[0], secret)
    //     res.json(token);
    // }
})

server.put('/usuarios/:id', async (req, res) => {
    //Peticion PUT para actualizar informacion de la tabla de usuarios//
})
server.get('/usuarios', async (req, res) => {
    //Peticion GET para traer lista de usuarios
})
server.delete('/usuarios/:id', async (req, res) => {
    //Peticion DELETE para eliminar de la tabla de usuarios//
})
server.get('/contactos', async (req, res) => {
    //Peticion GET para traer lista de contactos//
})
server.post('/contactos', async (req, res) => {
    //Peticion POST para insertar contacto en la tabla//
})
server.put('/contactos/:id', async (req, res) => {
    //Peticion PUT para actualizar contacto//
})
server.delete('/contactos/:id', async (req, res) => {
    //Peticion DELETE para eliminar contacto//
})
server.listen(server.get('port'), () => {
    console.log('server on port', server.get('port'));
  });