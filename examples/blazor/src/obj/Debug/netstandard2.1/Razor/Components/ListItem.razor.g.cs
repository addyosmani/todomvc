#pragma checksum "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\Components\ListItem.razor" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "f86bd33b28fb0129b53e509fde19433545c44c9f"
// <auto-generated/>
#pragma warning disable 1591
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
#nullable restore
#line 1 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\Components\ListItem.razor"
using Blazor.TodoMVC.Clientside.Data;

#line default
#line hidden
#nullable disable
    public partial class ListItem : Microsoft.AspNetCore.Components.ComponentBase
    {
        #pragma warning disable 1998
        protected override void BuildRenderTree(Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder)
        {
            __builder.OpenElement(0, "li");
            __builder.AddAttribute(1, "class", (
#nullable restore
#line 5 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\Components\ListItem.razor"
             Item.Completed ? "completed":""

#line default
#line hidden
#nullable disable
            ) + " " + (
#nullable restore
#line 5 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\Components\ListItem.razor"
                                                Item.IsEdited ? "editing":""

#line default
#line hidden
#nullable disable
            ));
            __builder.AddMarkupContent(2, "\r\n    ");
            __builder.OpenElement(3, "div");
            __builder.AddAttribute(4, "class", "view");
            __builder.AddMarkupContent(5, "\r\n        ");
            __builder.OpenElement(6, "input");
            __builder.AddAttribute(7, "class", "toggle");
            __builder.AddAttribute(8, "type", "checkbox");
            __builder.AddAttribute(9, "onchange", Microsoft.AspNetCore.Components.EventCallback.Factory.Create<Microsoft.AspNetCore.Components.ChangeEventArgs>(this, 
#nullable restore
#line 7 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\Components\ListItem.razor"
                                                         CheckedChanged

#line default
#line hidden
#nullable disable
            ));
            __builder.AddAttribute(10, "checked", 
#nullable restore
#line 7 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\Components\ListItem.razor"
                                                                                    Item.Completed

#line default
#line hidden
#nullable disable
            );
            __builder.CloseElement();
            __builder.AddMarkupContent(11, "\r\n        ");
            __builder.OpenElement(12, "label");
            __builder.AddAttribute(13, "ondblclick", Microsoft.AspNetCore.Components.EventCallback.Factory.Create<Microsoft.AspNetCore.Components.Web.MouseEventArgs>(this, 
#nullable restore
#line 8 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\Components\ListItem.razor"
                            EditItem

#line default
#line hidden
#nullable disable
            ));
            __builder.AddContent(14, 
#nullable restore
#line 8 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\Components\ListItem.razor"
                                       Item.Text

#line default
#line hidden
#nullable disable
            );
            __builder.CloseElement();
            __builder.AddMarkupContent(15, "\r\n        ");
            __builder.OpenElement(16, "button");
            __builder.AddAttribute(17, "class", "destroy");
            __builder.AddAttribute(18, "onclick", Microsoft.AspNetCore.Components.EventCallback.Factory.Create<Microsoft.AspNetCore.Components.Web.MouseEventArgs>(this, 
#nullable restore
#line 9 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\Components\ListItem.razor"
                                          DeleteItem

#line default
#line hidden
#nullable disable
            ));
            __builder.CloseElement();
            __builder.AddMarkupContent(19, "\r\n    ");
            __builder.CloseElement();
            __builder.AddMarkupContent(20, "\r\n    ");
            __builder.OpenElement(21, "input");
            __builder.AddAttribute(22, "class", "edit");
            __builder.AddAttribute(23, "onkeyup", Microsoft.AspNetCore.Components.EventCallback.Factory.Create<Microsoft.AspNetCore.Components.Web.KeyboardEventArgs>(this, 
#nullable restore
#line 11 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\Components\ListItem.razor"
                                                                    ItemTextKeyUp

#line default
#line hidden
#nullable disable
            ));
            __builder.AddAttribute(24, "onblur", Microsoft.AspNetCore.Components.EventCallback.Factory.Create<Microsoft.AspNetCore.Components.Web.FocusEventArgs>(this, 
#nullable restore
#line 11 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\Components\ListItem.razor"
                                                                                            ItemTextBlur

#line default
#line hidden
#nullable disable
            ));
            __builder.AddAttribute(25, "value", Microsoft.AspNetCore.Components.BindConverter.FormatValue(
#nullable restore
#line 11 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\Components\ListItem.razor"
                                                EditText

#line default
#line hidden
#nullable disable
            ));
            __builder.AddAttribute(26, "onchange", Microsoft.AspNetCore.Components.EventCallback.Factory.CreateBinder(this, __value => EditText = __value, EditText));
            __builder.SetUpdatesAttributeName("value");
            __builder.AddElementReferenceCapture(27, (__value) => {
#nullable restore
#line 11 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\Components\ListItem.razor"
                 _itemText = __value;

#line default
#line hidden
#nullable disable
            }
            );
            __builder.CloseElement();
            __builder.AddMarkupContent(28, "\r\n");
            __builder.CloseElement();
        }
        #pragma warning restore 1998
#nullable restore
#line 14 "C:\Users\Joe\source\repos\Blazor.TodoMVC\Blazor.TodoMVC.Clientside\Components\ListItem.razor"
            
    [Parameter]
    public ListItemModel Item { get; set; }

    [Parameter]
    public EventCallback<ListItemModel> OnRemoveCallback { get; set; }
    [Parameter]
    public EventCallback<ListItemModel> OnItemChanged { get; set; }

    private ElementReference _itemText;

    public const string EnterKey = "enter";
    public const string EscapeKey = "escape";

    private string EditText{ get; set; }


    public async Task DeleteItem()
    {
        await OnRemoveCallback.InvokeAsync(Item);
    }

    public async Task EditItem()
    {
        Item.IsEdited = true;
        EditText = Item.Text;
        await OnItemChanged.InvokeAsync(Item);
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if(Item.IsEdited)
            await JsRuntime.InvokeVoidAsync("JsFunctions.focusElement", _itemText);
    }

    private async Task ItemTextKeyUp(KeyboardEventArgs e)
    {
        switch (e.Key.ToLower())
        {
            case EnterKey:
                await HandleChange();
                break;
            case EscapeKey:
                Item.IsEdited = false;
                break;
        }
    }

    private async Task ItemTextBlur(FocusEventArgs e)
    {
        await HandleChange();
    }

    private async Task HandleChange()
    {
        if (Item.IsEdited)
        {
            if (string.IsNullOrEmpty(EditText))
                await DeleteItem();
            else
            {
                Item.IsEdited = false;
                Item.Text = EditText;
            }
        }
    }

    private async Task CheckedChanged(ChangeEventArgs e)
    {
        Item.Completed = (bool) e.Value;
        await OnItemChanged.InvokeAsync(Item);
    }

#line default
#line hidden
#nullable disable
        [global::Microsoft.AspNetCore.Components.InjectAttribute] private IJSRuntime JsRuntime { get; set; }
    }
}
#pragma warning restore 1591
