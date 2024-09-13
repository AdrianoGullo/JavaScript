const {Launchs, LaunchsModel} = require('../../Models/homeModel');


// Upcoming Launchs - TheSpaceDevs API
async function api_upcomingLaunchs(){
    try{
        const AtualLaunchs_MongoDB = await Launchs.buscaObjeto();

        if (AtualLaunchs_MongoDB.length === 0 ) {
            const upcomingLaunchs = await requestAPI_upcomingLaunchs();
            return upcomingLaunchs;
        } else {
            const AtualLanchs_First4 = await formatLaunchs(AtualLaunchs_MongoDB.slice(0, 4))
            return AtualLanchs_First4;
        }

    }catch(error){
        console.log(error);
    }
};

async function requestAPI_upcomingLaunchs() {
    const launchesResponse = await fetch(`https://ll.thespacedevs.com/2.2.0/launch/upcoming/`);
    const dataLaunch = await launchesResponse.json();
    const dataResults = dataLaunch.results;

    if (!dataLaunch.results) {
        throw new Error("Estrutura de dados inválida ou undefined");
    }

    for (const launchData of dataResults) {
        if (launchData && launchData.window_start && launchData.name) {
            const novoLaunch = new LaunchsModel({ data: launchData });
            await LaunchsModel.create(novoLaunch);
        }
    }
    
    const upcomingLaunchs = formatLaunchs(dataLaunch.results.slice(0, 4));
    return upcomingLaunchs;
}

function formatLaunchs(lancamentos) {
    return lancamentos.map((launch, index) => {
        let launchDate = launch.data.window_start;
        let missionDescription = launch.data.mission?.description || "None";
        let typeOfMission = launch.data.mission?.orbit?.name || "None";
        let status = "soon";

        let currentDate = new Date();
        let windowStart = new Date(launch.data.window_start);
        let windowEnd = new Date(launch.data.window_end);

        if (currentDate > windowEnd) {
            status = "done";
        } else if (currentDate >= windowStart && currentDate <= windowEnd) {
            status = "live";
        }
        
        return {
            img: launch.data.image,
            title: launch.data.name,
            description: missionDescription,
            date: changeDateType(launchDate),
            mission: typeOfMission,
            headAgency: findAgencyAbbrev(launch.data),
            status: status,
            index: index + 1,

            agencia:  findAgencyAbbrev(launch.data), 
            agenciaImage: launch.data.mission?.agencies[0]?.logo_url || "default-map-image.jpg",
            agenciaDescription: launch.data.mission?.agencies[0]?.description || "N/A",

            pad: launch.data.pad?.name || "N/A",
            padLocation: launch.data.pad?.location?.name || "N/A",
            padImage: launch.data.pad?.map_image || "default-map-image.jpg", // Imagem padrão para o mapa

            program: launch.data.program[0]?.name || "No program specified",
            programDescription: launch.data.program[0]?.description || "N/A",
            programImage: launch.data.program[0]?.image_url || "default-program-image.jpg", // Imagem padrão para o programa

            rocket: launch.data.rocket?.configuration?.full_name || "N/A"
        };
    });
}

function findAgencyAbbrev(launch) {
    if (launch && launch.mission && launch.mission.agencies && Array.isArray(launch.mission.agencies) && launch.mission.agencies.length > 0) {
        return launch.mission.agencies[0].name || "None";
    }
    return "None";
}

function changeDateType(dataLaunch){
    let dateObj = new Date(dataLaunch);
    let day = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    
    let formattedDate;

    if (hours < 10){
        if(minutes < 10 & month < 10) formattedDate = `0${hours}:0${minutes} - ${day}/0${month}/${year}`;
        else if (minutes < 10 & month >= 10) formattedDate = `0${hours}:0${minutes} - ${day}/${month}/${year}`;
        else if (minutes > 10 & month < 10) formattedDate = `0${hours}:${minutes} - ${day}/0${month}/${year}`;
    } else {
        if(minutes < 10 & month < 10) formattedDate = `${hours}:0${minutes} - ${day}/0${month}/${year}`;
        else if (minutes < 10 & month >= 10) formattedDate = `${hours}:0${minutes} - ${day}/${month}/${year}`;
        else if (minutes > 10 & month < 10) formattedDate = `${hours}:${minutes} - ${day}/0${month}/${year}`;
    }
    return formattedDate;
}


module.exports = {
    api_upcomingLaunchs,
    requestAPI_upcomingLaunchs,
    formatLaunchs,
    findAgencyAbbrev,
    changeDateType
  };