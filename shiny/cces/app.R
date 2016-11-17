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
   
   selectInput("xvar", "X Variable:",
               c("Age" = "age",
                 "Survey Weight" = "weight",
                 "Gender" = "gender",
                 "Race" = "race",
                 "Employment Status" = "employ",
                 "Family Income" = "family_income",
                 "Religion" = "religion",
                 "Obama Vote" = "obama12")),
   selectInput("yvar", "Y Variable:",
               c("Survey Weight" = "weight",
                 "Age" = "age",
                 "Gender" = "gender",
                 "Race" = "race",
                 "Employment Status" = "employ",
                 "Family Income" = "family_income",
                 "Religion" = "religion",
                 "Obama Vote" = "obama12")),
   selectInput("colorvar", "Color Variable:",
               c("Obama Vote" = "obama12",
                 "Survey Weight" = "weight",
                 "Age" = "age",
                 "Gender" = "gender",
                 "Race" = "race",
                 "Employment Status" = "employ",
                 "Family Income" = "family_income",
                 "Religion" = "religion")),
   selectInput("facetvar", "Facet Variable:",
               c("State" = "state",
                 "Gender" = "gender",
                 "Race" = "race",
                 "Employment Status" = "employ",
                 "Family Income" = "family_income",
                 "Religion" = "religion",
                 "Obama Vote" = "obama12")),
   plotOutput("data")
))

# Define server logic required to draw a histogram
server <- shinyServer(function(input, output) {
   
  # connect to data
  # db <- src_sqlite("https://kuriwaki.github.io/datasets/cces.sqlite3")
     cc <- foreign::read.dta("https://kuriwaki.github.io/datasets/cces_sample.dta")
  
   output$data <- renderPlot({
     ggplot(cc, aes_string(x = input$xvar, y = input$yvar, color = input$colorvar)) +
       geom_point(alpha = 0.7) +
       facet_wrap(input$facetvar) +
       geom_smooth(method = "gam", color = "navy") + 
       theme_minimal()
   })
})

# Run the application 
shinyApp(ui = ui, server = server)
