var atan2 = Math.atan2,
    sqrt = Math.sqrt,
    cos = Math.cos,
    sin = Math.sin,
    HALF_PI = Math.HALF_PI;


/*
 * Perform a fully elastic collision between the two objects
 * @reference http://en.wikipedia.org/wiki/Elastic_collision
 * @source https://github.com/benmurrell/node-multiplayer-asteroids
 *
 */
function elastic(aPos, aVelocity, aMass, bPos, bVelocity, bMass) {
    // Determine contact angle
    var contactAngle = atan2(aPos[1] - bPos[1], aPos[0] - bPos[0]);

    // Determine velocities after collision
    var vLeft = sqrt(aVelocity[0] * aVelocity[0] + aVelocity[1] * aVelocity[1]);
    var thetaLeft = atan2(aVelocity[1], aVelocity[0]);

    var vRight = sqrt(bVelocity[0] * bVelocity[0] + bVelocity[1] * bVelocity[1]);
    var thetaRight = atan2(bVelocity[1], bVelocity[0]);

    var lc_tca = cos(thetaLeft - contactAngle),
        rc_tca = cos(thetaRight - contactAngle),
        ls_tca = sin(thetaLeft - contactAngle),
        rs_tca = sin(thetaRight - contactAngle),
        cContactAngle = cos(contactAngle),
        sContactAngle = sin(contactAngle),
        mass_sum = (aMass + bMass),
        lmass_dif = (aMass - bMass),
        rmass_dif = (bMass - aMass),
        left_num = (vLeft * lc_tca * lmass_dif + 2 * bMass * vRight * rc_tca),
        right_num = (vRight * rc_tca * rmass_dif + 2 * aMass * vLeft * lc_tca);

    // elastic collision with mass
    aVelocity[0] = left_num / mass_sum * cContactAngle + vLeft * ls_tca * cos(contactAngle + HALF_PI);
    aVelocity[1] = left_num / mass_sum * sContactAngle + vLeft * ls_tca * sin(contactAngle + HALF_PI);

    bVelocity[0] = right_num / mass_sum * cContactAngle + vRight * rs_tca * cos(contactAngle + HALF_PI);
    bVelocity[1] = right_num / mass_sum * sContactAngle + vRight * rs_tca * sin(contactAngle + HALF_PI);
};


module.exports = elastic;