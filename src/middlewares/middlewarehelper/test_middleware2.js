module.exports = async (req, res ,next) =>
{
    if(req.query.b == 4){
        next(true)
    }
    else{
        next(false, 403, 'Access Denied')
    }
}