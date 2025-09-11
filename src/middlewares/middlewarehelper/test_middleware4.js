module.exports = async (req, res ,next) =>
{
    if(req.query.d == 4){
        next(true)
    }
    else{
        next(false, 403, 'Access Denied')
    }
}