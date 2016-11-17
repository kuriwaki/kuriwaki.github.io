#
# This is a Shiny web application. You can run the application by clicking
# the 'Run App' button above.
#
# Find out more about building applications with Shiny here:
#
#    http://shiny.rstudio.com/
#

library(shiny)
library(foreign)
library(dplyr)
library(ggplot2)

# Define UI for application that draws a histogram
ui <- shinyUI(fluidPage(
  
  # Application title
  titlePanel("2012 CCES Data"),
  helpText("Use this app to browse the results of the 2012 CCES survey"),
  
  # Layout
  sidebarLayout(
    
    # Sidebar
    sidebarPanel(
      selectInput("xvar", "X Variable:",
                  c("Age" = "age",
                    "Survey Weight" = "weight",
                    "Gender" = "gender",
                    "Race" = "race",
                    "Employment Status" = "employ",
                    "Family Income" = "family_income",
                    "Religion" = "religion",
                    "Home Ownership" = "home_ownership",
                    "Union Membership" = "union",
                    "Partisan Identification (3-point)" = "pid3",
                    "Ideology (5-point)" = "ideo5",
                    "Ideology (7-point)" = "ideo7",
                    "Obama Vote" = "obama12")),
      selectInput("yvar", "Y Variable:",
                  c("Survey Weight" = "weight",
                    "Age" = "age",
                    "Gender" = "gender",
                    "Race" = "race",
                    "Employment Status" = "employ",
                    "Family Income" = "family_income",
                    "Religion" = "religion",
                    "Home Ownership" = "home_ownership",
                    "Union Membership" = "union",
                    "Partisan Identification (3-point)" = "pid3",
                    "Ideology (5-point)" = "ideo5",
                    "Ideology (7-point)" = "ideo7",
                    "Presidential Vote" = "vote_pres_12")),
      selectInput("colorvar", "Color Variable:",
                  c("Partisan Identification (3-point)" = "pid3",
                    "Presidential Vote" = "vote_pres_12",
                    "Survey Weight" = "weight",
                    "Age" = "age",
                    "Gender" = "gender",
                    "Race" = "race",
                    "Employment Status" = "employ",
                    "Family Income" = "family_income",
                    "Home Ownership" = "home_ownership",
                    "Union Membership" = "union",
                    "Ideology (5-point)" = "ideo5",
                    "Ideology (7-point)" = "ideo7",
                    "Religion" = "religion")),
      selectInput("facetvar", "Facet Variable:",
                  c("Presidential Vote" = "vote_pres_12",
                    "State" = "state",
                    "Gender" = "gender",
                    "Race" = "race",
                    "Employment Status" = "employ",
                    "Family Income" = "family_income",
                    "Religion" = "religion",
                    "Home Ownership" = "home_ownership",
                    "Union Membership" = "union",
                    "Partisan Identification (3-point)" = "pid3",
                    "Ideology (5-point)" = "ideo5",
                    "Ideology (7-point)" = "ideo7"))
    ), # end sidebar
    
    # Graph
    mainPanel(plotOutput("data", height = "800px"))
  ) # end Layout
)
)

# Define server logic required to draw a histogram
server <- shinyServer(function(input, output) {
   
  # connect to data
  # db <- src_sqlite("https://kuriwaki.github.io/datasets/cces.sqlite3")
     cc <- foreign::read.dta("https://kuriwaki.github.io/datasets/cces_sample.dta")
  
   output$data <- renderPlot({
     ggplot(cc, aes_string(x = input$xvar, y = input$yvar, color = input$colorvar)) +
       geom_point(alpha = 0.5) +
       scale_color_brewer(palette = "Dark2") +
       facet_wrap(input$facetvar) +
       geom_smooth(method = "gam", color = "navy") + 
       theme_minimal()
   })
})

# Run the application 
shinyApp(ui = ui, server = server)
