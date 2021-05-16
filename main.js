
// Create route components
const Home = {template: `

    <main id='home'>
        <div class="about__me">
            <img src="/img/avatar.jpg" alt="user avatar" width="30%">
            <h1>Andreas Lind</h1>
            <h3>.NET Student</h3>
            <p>A well-structured developer student with years of experience <br>from the Armed Forces.</p>
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
                <img src="/img/avatar.jpg" alt="user avatar">
                <div class="bio__media__text">
                    <h1>Andreas Lind</h1>
                    <h3>.NET student</h3>
                    <p>A well-structured developer student with years of experience <br>from the Armed Forces.</p>
                </div>
            </div> 
            <nav>
                <router-link to="/" class="p_2">Home</router-link>
                <router-link to="/projects" class="p_2">Projects</router-link>
                <a :href="gitHubLink" target="_blank">
                    <i class="fab fa-github fa-lg fa-fw"></i>
                </a>
            </nav>
        </header>
        
        <main class="container">
        
            <!-- Show an error message if the REST API doesn't work -->
            <div class="error" v-if="errors">
                Sorry! It seems we can't fetch data righ now 😥
            </div>
            <!-- Otherwise show a section for our portfolio projects and skills section-->
            <section id="portfolio" v-else>
                <!-- loading message -->
                <div class="loading" v-if="loading">
                    😴 Loading ...
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
                        <div class="card_custom__button">
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
                        <h2>Development Skills</h2>
                        <ul class="skills"> 
                            <li v-for="skill in skills">{{skill}}</li>
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
            loading : true,
            errors: false,
            gitHubLink: 'https://github.com/andreaslind31'
            }
    },
    methods:{
        fetchData: function () {
            axios.get(`https://api.github.com/users/andreaslind31/repos?per_page=${this.perPage}&page=${this.page}`)
                .then(response => { 
                    console.log(response);
                    this.projects = response.data;
                    this.projects.forEach( project => {
                        if(project.language !== null && !this.skills.includes(project.language)) {
                            this.skills.push(project.language)
                        }
                    })

                })
                .catch(error => { 
                    console.log(error);
                    this.errors = true;
            }).finally( ()=> {
                this.loading = false;
                this.getProjects();
            })
        }, 
        getProjects(){
            this.projectsList = this.projects.slice(0, this.projectsCount);
            return this.projectsList;
        },
        loadMore(){
            if(this.projectsList.length <= this.projects.length ) {
                this.projectsCount += 5;
                this.getProjects();
                // this.projectsList = this.projects.slice(0, this.projectsCount);
            }
        },
        trimTitle(text){
            const title = text.replaceAll("-", " ").replaceAll("_", " ");
            if(title.length > 15) {
                return title.slice(0, 12) + ' ...';
            } 
            return title
        },
        trimText(text){
            
            if(text === null) {
                return 'This project has no description yet!'
            } else if(text.length > 100) {
                 return text.slice(0, 100) + ' ...'
            } 
            return text;
        }
    },
    mounted(){
      //this.fetchData();  
      setTimeout(this.fetchData, 2000);
    }
}

// Define routes

const routes = [
    {path: '/', component: Home},
    {path: '/projects', component: Projects},
];


// create the router instance
const router = new VueRouter({
    routes
})

// create and mount the vue instance

const app = new Vue({
    router
}).$mount('#app')