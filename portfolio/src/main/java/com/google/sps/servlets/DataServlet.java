// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import java.io.IOException;
import java.util.ArrayList;
import com.google.gson.Gson;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
  @Override
  /*
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    ArrayList<String> comments = new ArrayList<String>();
    
    String json = convertToJsonUsingGson(books); 
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }
  */
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
   // Get the input from the form.
        ArrayList<String> comments = new ArrayList<String>();  
        String text = getParameter(request, "comments", "");
        comments.add(text); 
    //boolean upperCase = Boolean.parseBoolean(getParameter(request, "upper-case", "false"));
    //boolean sort = Boolean.parseBoolean(getParameter(request, "sort", "false"));

    // Respond with the result.
        response.setContentType("text/html;");
        response.getWriter().println(comments);
        response.sendRedirect("/index.html");
    }
  /**
   * @return the request parameter, or the default value if the parameter
   *         was not specified by the client
   */
    private String getParameter(HttpServletRequest request, String name, String defaultValue) {
        String value = request.getParameter(name);
        if (value == null) {
            return defaultValue;
        }
        return value;
  }
    private String convertToJsonUsingGson(ArrayList<String> input) {
        Gson gson = new Gson();
        String json = gson.toJson(input);
        return json;
    }
}
