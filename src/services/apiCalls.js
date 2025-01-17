const root = "http://localhost:4000/api/"

export const loginService = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    };

    try {
        const response = await fetch(`${root}auth/login`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
};

export const RegisterUser = async (user) => {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }

    try {
        const response = await fetch(`${root}auth/register`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

export const GetProfile = async (token) => {

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${root}users/profile`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

export const UpdateProfile = async (token, data) => {

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(`${root}users/profile`, options);

        const data = await response.json();
        console.log("datos");
        console.log(data)

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

export const GetPosts = async (token) => {

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${root}posts`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data.data;
    } catch (error) {
        return error;
    }
}

export const GetMyPosts = async (token) => {

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${root}posts/own`, options);

        const data = await response.json();
        // console.log(data,"data");

        if (!data.success) {
            throw new Error(data.message);
        }

        return data.data;
    } catch (error) {
        return error;
    }
}

export const AddLike = async (token, postId) => {

    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${root}posts/like/${postId}`, options);

        const data = await response.json();
        console.log("datos");
        console.log(data)

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

export const DeletePosts = async (postId, token) => {

    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${root}posts/${postId}`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

export const CreatePost = async (token, postData) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(postData)
    };

    try {
        const response = await fetch(`${root}posts`, options);

        const data = await response.json();
        console.log("datos");
        console.log(data)

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

export const GetUsers = async (token) => {

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${root}users`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}

export const DeleteUsers = async (userId, token) => {

    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(`${root}users/${userId}`, options);

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return error;
    }
}
