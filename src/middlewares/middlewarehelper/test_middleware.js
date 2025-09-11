module.exports = async (req, res ,next) =>
{
    if(req.query.a == 2){
        next(true)
    }
    else{
        next(false, 403, 'Access Denied')
    }
}