function computeWallUValue(wall, default_lambda) {
    console.log(wall)
    const Rse = 0.04;
    const Rsi = 0.10;
    const Rcavity = wall.type.key === "hollow_wall" && wall.isolation.key === "no" ? 0.15 : 0;

    const woodFraction = wall.structure.woodFraction || 0;
    const lambda_isol = wall.userLambda || (default_lambda === 'lambda_new_insulation' ? wall.isolationType.lambda_EPBD : wall.isolationType.lambda_TRD) || 1;

    console.log(lambda_isol);

    const eisol = wall.thickness / 100; // Convert cm to meters

    const Risol = eisol / (0.13 * woodFraction + (1 - woodFraction) * lambda_isol);

    const Rtotal = Rse + Rsi + Rcavity + wall.constructElement.Rvalue + wall.finishing.Rvalue + Risol;

    const Uvalue = 1 / Rtotal;
    return Uvalue;
}

function computeRoofUValue(roof, default_lambda) {
    const Rse = 0.04;
    const Rsi = 0.10;

    const woodFraction = roof.structure.woodFraction || 0;
    const lambda_isol = roof.userLambda || (default_lambda === 'lambda_new_insulation' ? roof.isolationType.lambda_EPBD : roof.isolationType.lambda_TRD) || 1;

    const eisol = roof.thickness / 100; // Convert cm to meters

    const Risol = eisol / (0.13 * woodFraction + (1 - woodFraction) * lambda_isol);

    const Rtotal = Rse + Rsi + Risol + roof.type.Rvalue;

    const Uvalue = 1 / Rtotal;
    return Uvalue;
}


function computeSoilUValue(soil, default_lambda) {
	// this U value refers to the ground temperature, not the exterior temperature. So, only
	// see old PDF u values catalogues

	const Rstructure = 0.10 // see old PDF U  values catalogus
		
    const Rse = soil.type.key == "on_ground" ? 0.0 : 0.17;
	const Rsi = 0.17;

    const lambda_isol = soil.userLambda || (default_lambda === 'lambda_new_insulation' ? soil.isolationType.lambda_EPBD : soil.isolationType.lambda_TRD) || 1;

    const eisol = soil.thickness / 100; // Convert cm to meters

    const Risol = eisol / lambda_isol;

    const Rtotal = Rstructure + Rse + Rsi + Risol;

    const Uvalue = 1 / Rtotal;
    return Uvalue;
}


