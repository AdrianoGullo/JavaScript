const Contato = require('../Models/contatoModel');

exports.index = (requisicao, resposta) => {
    resposta.render('contato', {
        contato: {}
    });
};

exports.register = async (requisicao, resposta) => {
    try{
        const contato = new Contato(requisicao.body);
        await contato.register();
    
        if(contato.errors.length > 0){
            requisicao.flash('errors', contato.errors);
            requisicao.session.save(() => resposta.redirect('/contato/index'));
            return;
        };
    
        requisicao.flash('success', 'Contato registrado com sucesso.');
        requisicao.session.save(() => resposta.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } 
    catch(e){
        console.log(e);
        return resposta.render('404');
    }
}

exports.editIndex = async function(requisicao, resposta){
    if(!requisicao.params.id) return resposta.render('404');
    const contato = await Contato.buscaPorId(requisicao.params.id);
    if(!contato) return resposta.render('404');

    resposta.render('contato', { contato }); 
}

exports.edit = async function(requisicao, resposta){
    try{
        if(!requisicao.params.id) return resposta.render('404');
        const contato = new Contato(requisicao.body);
        await contato.edit(requisicao.params.id);
        
        if(contato.errors.length > 0){
            requisicao.flash('errors', contato.errors);
            requisicao.session.save(() => resposta.redirect('/contato/index'));
            return;
        };

        requisicao.flash('success', 'Contato editado com sucesso.');
        requisicao.session.save(() => resposta.redirect(`/contato/index/${contato.contato._id}`));
        return;
    }
    catch(e){
        console.log(e);
        resposta.render('404');
    }
}