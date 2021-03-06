// route components

const Home = {
    template: `

    <main id='home'>
        <div class="about__me">
            <img src="./img/avatar.svg" alt="user avatar" width="30%">
            <h1><router-link to="/projects" class="reversed_link"> Andreas Lind </router-link></h1>
            <h3>.NET student</h3>
            <p>A well-structured developer student with years of experience <br>from the Swedish Armed Forces.</p>
            <div class="skills_projects_link">
                <router-link to="/projects"> Projects | Skills </router-link>
            </div>
        </div>
    </main>
`}
const Projects = {
    template: `
    <div> 
        <header id="site_header" class="container d_flex">
            <div class="bio__media">
                <img src="img/avatar.svg" alt="user avatar">
                <div class="bio__media__text">
                    <h1>Andreas Lind</h1>
                    <h3>.NET student</h3>
                    <p>A well-structured developer student with years of experience <br>from the Swedish Armed Forces.</p>
                </div>
            </div> 
            <nav>
                <router-link to="/" class="p_2">Home</router-link>
                <router-link to="/projects" class="p_2">Projects</router-link>
                <a :href="gitHubLink" target="_blank">
                    <i class="fab fa-github fa-lg fa-fw"></i>
                </a>
                <a href="https://www.linkedin.com/in/andreas-lind31/" target="_blank">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="mailto:andreaslind31@gmail.com" target="_blank">
                    <i class="fas fa-envelope"></i>
                </a>
            </nav>
        </header>
        
        <main class="container">
            <section class="margin-t">
            <h4>Published projects</h4>
            <div class="projects">
                    <div class="card__static">
                        <div class="card__static__text">
                            <div> 
                                <a href="http://booking.greenroomtraining.se"><h3>Greenroomtraining</h3></a>
                                <p>A bookingsystem for greenroomtraining.se. Made as an .NET MVC app, with bootstrap.</p>
                            </div>
                        </div>

                        <div class="card__static__img"></div>
                        <div class="card__static__button">
                            <a href="http://booking.greenroomtraining.se" target="_blank">
                                Page
                            </a>
                        </div>
                    </div>
                        <div class="card__static">
                            <div class="card__static__text">
                                <div> 
                                    <h3>Flickr gallery</h3>
                                    <p>A web app done with vanilla JS, HTML, CSS. Fetches data from the flickr RESTapi. Published to GitHub pages.</p>
                                </div>
                            </div>

                            <div class="card__static__img"></div>
                            <div class="card__static__button">
                                <a href="https://andreaslind31.github.io/flickrGallery" target="_blank">
                                    Page
                                </a>
                            </div>
                    </div>
                </div>
            </section>
        
            <!-- Show an error message if the REST API doesn't work -->
            <div class="error" v-if="errors">
                Sorry! It seems we can't fetch data from GitHub right now.
            </div>
            <!-- Otherwise show a section for our portfolio projects and skills section-->
            <section class="margin-t" v-else>
            <h4>Code from GitHub</h4>
                <!-- loading message -->
                <div class="loading" v-if="loading">
                    Loading projects & skills from GitHub ...
                </div>
                
                <!-- show the projects -->
                <div class="projects" v-else>
                
                    <div v-for="project in projectsList" class="card__custom" >
                        <div class="card__custom__text"> 
                            <div> 
                                <h3>{{trimTitle(project.name)}}</h3>
                                <p>{{trimText(project.description)}}</p>
                            </div>

                            <div class="meta__data d_flex">
                                <div class="date">
                                    <h5>Updated at</h5>
                                    <div> {{ new Date(project.updated_at).toDateString()}}</div>
                                </div>
                                <img class="avatar" :src="project.owner.avatar_url">
                            </div>
                        </div>
                        

                        <div class="card__custom__img"></div>
                        <div class="card__custom__button">
                            <a :href="project.html_url" target="_blank">
                                Code
                            </a>
                        </div>
                    
                    </div>

                    <div v-if="!loading" style="text-align:center; width: 100%" >
                        <div v-if="projectsList.length < projects.length"> 
                            <button class="btn_load_more" v-on:click="loadMore()">Load More</button>
                        </div>
                        <div v-else>
                            <a :href="gitHubLink" target="_blank">Visit My GitHub</a>
                        </div>

                    </div>

                    <div id="skills_section">
                    <h2>Skills</h2>
                        <ul class="skills"> 
                            <li v-for="skill in skills">{{skill}}</li>
                            <li>Git</li>
                            <li>MS SQL</li>
                            <li>MySQL</li>
                            <li>Scrum</li>
                        </ul>
                    </div>
                </div>
            </section>
        
        </main>

    </div>
    `,
    data() {
        return {
            projects: [],
            projectsList: null,
            skills: [],
            projectsCount: 5,
            perPage: 20,
            page: 1,
            loading: true,
            errors: false,
            gitHubLink: 'https://github.com/andreaslind31'
        }
    },
    methods: {
        fetchData: function () {
            axios.get(`https://api.github.com/users/andreaslind31/repos?per_page=${this.perPage}&page=${this.page}`)
                .then(response => {
                    console.log(response);
                    this.projects = response.data;
                    this.projects.forEach(project => {
                        if (project.language !== null && !this.skills.includes(project.language)) {
                            this.skills.push(project.language)
                        }
                    })

                })
                .catch(error => {
                    console.log(error);
                    this.errors = true;
                }).finally(() => {
                    this.loading = false;
                    this.getProjects();
                })
        },
        getProjects() {
            this.projectsList = this.projects.slice(0, this.projectsCount);
            return this.projectsList;
        },
        loadMore() {
            if (this.projectsList.length <= this.projects.length) {
                this.projectsCount += 5;
                this.getProjects();
            }
        },
        trimTitle(text) {
            const title = text.replaceAll("-", " ").replaceAll("_", " ");
            if (title.length > 15) {
                return title.slice(0, 12) + ' ...';
            }
            return title
        },
        trimText(text) {

            if (text === null) {
                return 'This project has no description yet!'
            } else if (text.length > 100) {
                return text.slice(0, 100) + ' ...'
            }
            return text;
        }
    },
    mounted() {
        setTimeout(this.fetchData, 2000);
    }
}

// define routes
const routes = [
    { path: '/', component: Home },
    { path: '/projects', component: Projects },
];


// create the router instance
const router = new VueRouter({
    routes
})

// create and mount the vue instance
const app = new Vue({
    router
}).$mount('#app')

// ???????? 