
const GET = async (route, params={}) => {
    if(params.size != 0) {
        route = `${route}?`;
        first = false;
        for(const [key, value] of params.entries()) {
            if(!first) {
                route = `${route}&`;
            }
            route = `${key}=${value}`;
        }
    }

    try {
        const res = await fetch(
            route,
            {
                method: 'GET',
            }
        );
        const data = await res.json();

        return data
    }
    catch(err) {
        console.log(err);
    }
}

const POST = async (route, body={}, params={}) => {
    if(params.size != 0) {
        route = `${route}?`;
        first = false;
        for(const [key, value] of params.entries()) {
            if(!first) {
                route = `${route}&`;
            }
            route = `${key}=${value}`;
        }
    }

    try {
        const res = await fetch(
            route,
            {
                method: 'POST',
                body: body
            }
        );
        const data = await res.json();

        return data
    }
    catch(err) {
        console.log(err);
    }
}