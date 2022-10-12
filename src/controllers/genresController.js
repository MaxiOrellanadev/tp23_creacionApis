const db = require('../database/models');
const sequelize = db.sequelize;


const genresController = {
    list: async (req, res) => {

        try{
            let genres = await db.Genre.findAll({
                order : ["name"],
                attributes : {
                    exclude : ["created_at","update_at"]
                }
            })
             if(genres){
                return res.status(200).json({
                    ok: true,
                    meta : {
                        total : genres.length
                    },
                    data : genres
                })
            }
            throw new Error({
                ok: false,
                msg:"Upss, hubo un error"
            })


        }  catch(error) {
            console.log(error)
            return res.status(500).json({
                ok: false,
                msg : error.message ? error.message : "comuniquese con el administrador del sitio"
            })
        }  
       
            
    },
    'detail': (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                res.render('genresDetail.ejs', {genre});
            });
    }

}

module.exports = genresController;