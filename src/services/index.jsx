import Axios from 'axios'

// Base-URL
const baseUrl = process.env.REACT_APP_API_BASE_URL

const urlOrganization = `${baseUrl}/organization`
const urlProject = `${baseUrl}/project`

export const services = {
    GET: {
        organizationData: () => {
            return Axios.get(urlOrganization, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
        },
        projectData: () => {
            return Axios.get(urlProject, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
        },
    },
}
