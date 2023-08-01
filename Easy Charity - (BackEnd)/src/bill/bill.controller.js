'use strict'

const Bill = require('./bill.model');
const User = require('../user/user.model');
const Donation = require('../donation/donation.model');

/*TEST*/ 
exports.test = (req,res)=>{
    return res.send({message: 'test function is running'});
}

//Hacer la factura
exports.buy = async(req,res)=>{
    try{
        //traemos los datos
        let userID = req.user.sub;
        let data = req.body;

        let user = await User.findOne({_id: userID});
    
        //Se verifica que la donacion exista
        let donation = await Donation.findOne({_id: data.donation});
        if(!donation) return res.status(404).send({message: 'Donacion no encotrada'});

        //if(user._id != donation.user) return res.status(400).send({message: 'No donaste a esta organizacion'});
        
        //Se agregan los datos de la fecha
        let params = {
            name: user.name,
            surname: user.surname,
            date: new Date(Date.now()).getTime(),
            donation: donation,
            total: donation.amount 
        };

        //Se guarda en la 
        let bill = new Bill(params);
        await bill.save();

        return res.send({message: 'Factura Creada :', bill});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al crear la factura'});
    }
}

//Traer las facturas del usuario logeado
exports.getLogged = async(req,res) =>{
    try{
        //obtenemos el Token
        let user = req.user.sub;

        //Se buscan las facturas con el id del Usuario que viene en el token
        let billsLogged = await Bill.find({_id: user}).populate('donation');

        return res.send({billsLogged});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al Traer kas facturas del usuario Loggeado'});
    }
}

//Traer todas las facturas
exports.getBills = async(req,res)=>{
    try{
        //Se buscan todas las facturas
        let bills = await Bill.find().populate('donation');
        return res.send({bills})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al traer las facturas'})
    }
}



