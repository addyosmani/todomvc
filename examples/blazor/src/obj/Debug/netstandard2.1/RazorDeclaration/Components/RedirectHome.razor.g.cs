#pragma checksum "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\Components\RedirectHome.razor" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "1d10d3169eb99d549f6a5ae0e8e89d4465327578"
// <auto-generated/>
#pragma warning disable 1591
#pragma warning disable 0414
#pragma warning disable 0649
#pragma warning disable 0169

namespace Blazor.TodoMVC.Clientside.Components
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Components;
#nullable restore
#line 1 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\_Imports.razor"
using System.Net.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\_Imports.razor"
using Microsoft.AspNetCore.Components.Forms;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\_Imports.razor"
using Microsoft.AspNetCore.Components.Routing;

#line default
#line hidden
#nullable disable
#nullable restore
#line 4 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\_Imports.razor"
using Microsoft.AspNetCore.Components.Web;

#line default
#line hidden
#nullable disable
#nullable restore
#line 5 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\_Imports.razor"
using Microsoft.JSInterop;

#line default
#line hidden
#nullable disable
#nullable restore
#line 6 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\_Imports.razor"
using Blazor.TodoMVC.Clientside;

#line default
#line hidden
#nullable disable
#nullable restore
#line 7 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\_Imports.razor"
using Blazor.TodoMVC.Clientside.Components;

#line default
#line hidden
#nullable disable
    public partial class RedirectHome : Microsoft.AspNetCore.Components.ComponentBase
    {
        #pragma warning disable 1998
        protected override void BuildRenderTree(Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder)
        {
        }
        #pragma warning restore 1998
#nullable restore
#line 2 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\Components\RedirectHome.razor"
       
    protected override void OnInitialized()
    {
        Navigation.NavigateTo("", true);
    }

#line default
#line hidden
#nullable disable
        [global::Microsoft.AspNetCore.Components.InjectAttribute] private NavigationManager Navigation { get; set; }
    }
}
#pragma warning restore 1591
