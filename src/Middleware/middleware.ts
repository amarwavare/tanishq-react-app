export const fetchUserData = async () => {
    try {
        const data = await fetch('https://jsonplaceholder.typicode.com/users', {method:'GET'})
        return {
            success: true,
            message: 'data fetched',
            data: await data.json()
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Unable to fetch data',
            error: error
        }
    }
}