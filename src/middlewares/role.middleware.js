/*
-----------------------------------------------------------------------------------------------------------------------
file name           :   role.middleware.js
author              :   Joel Cunha Faria
collaborators       :   Jason Edmonds, Samuel Theytaz
creation date       :   25.03.2026
modification date   :   29.03.2026
version             :   1.0
-----------------------------------------------------------------------------------------------------------------------
*/
function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                message: 'Access denied'
            });
        }

        next();
    };
}

module.exports = authorizeRoles;