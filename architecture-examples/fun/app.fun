import localstorage
import list
import text
import uuid
import app

<head>
	<meta charset="utf-8" />
	<title>"Fun • TodoMVC"</title>
	<link rel="stylesheet" href="../../assets/base.css" />
	<link rel="stylesheet" href="css/app.css" />
</head>

tasks = []
displayFilter = 'all'

app.whenLoaded(handler() {
	localstorage.persist(tasks, 'todos-fun.tasks')
	localstorage.persist(displayFilter, 'todos-fun.displayFilter')
})

getDisplayTasks = function(displayFilter) {
	return list.filter(tasks, function(task) {
		if displayFilter is 'all' {
			return true
		} else if displayFilter is 'active' {
			return !task.completed
		} else {
			return task.completed
		}
	})
}

createNewTask = handler(taskName) {
	trimmedName = text.trim(taskName)
	if trimmedName is ! '' {
		tasks push: { title:trimmedName, completed:false, id:uuid.v4() }
	}
}

<section id="todoapp">
	<header id="header">
		<h1>"todos"</h1>
		newTaskName = ''
		<input id="new-todo" placeholder="What needs to be done?" autofocus=true data=newTaskName onkeypress=handler(event) {
			if (event.keyCode is 13) {
				createNewTask(newTaskName.copy())
				newTaskName set: ''
			}
		}/>
	</header>
	
	if tasks.length {
		<section id="main">
			toggleAll = false
			<input id="toggle-all" type="checkbox" checked=toggleAll onchange=handler() {
				toggled = (!toggleAll).copy()
				toggleAll set: toggled
				for task in tasks {
					task set: 'completed', toggled
				}
			} />
			<label for="toggle-all">"Mark all as complete"</label>
			<ul id="todo-list">
				for task in getDisplayTasks(displayFilter) {
					editing = false
					<li class=(task.completed ? "complete" : "") + (editing ? " editing" : "")>
						<div class="view">
							<input class="toggle" type="checkbox" data=task.completed />
							<label>task.title</label ondblclick=handler() {
								editing set:true
							}>
							<button class="destroy"></button onclick=handler() {
								tasks set: list.filter(tasks.copy(), function(checkTask) { return checkTask.id is ! task.id })
							}>
						</div>
						
						newTitle = task.title
						<input class="edit" data=newTitle autofocus="true" onblur=handler() {
							task set:'title', newTitle.copy()
						} />
					</li>
				}
			</ul>
		</section>
		
		<footer id="footer">
			completedTasks = list.filter(tasks, function(task) { return task.completed })
			
			<span id="todo-count">
				pluralize = function(num) { return num is > 1 ? "items" : "item" }
				numTasksLeft = tasks.length - completedTasks.length
				<strong>numTasksLeft</strong>" "pluralize(numTasksLeft)" left"
			</span>
			
			<ul id="filters">
				<li><a href="#" class=(displayFilter is 'all' ? 'selected' : '')>"All"</a></li onclick=handler() {
					displayFilter set:'all'
				}>
				<li><a href="#" class=(displayFilter is 'active' ? 'selected' : '')>"Active"</a></li onclick=handler() {
					displayFilter set:'active'
				}>
				<li><a href="#" class=(displayFilter is 'completed' ? 'selected' : '')>"Completed"</a></li onclick=handler() {
					displayFilter set:'completed'
				}>
			</ul>
			
			<button id="clear-completed">"Clear completed ("completedTasks.length")"</button onclick=handler() {
				remainingTasks = list.filter(tasks, function(task) { return !task.completed })
				tasks set: remainingTasks.copy()
			}>
		</footer>
	}
</section>

<footer id="info">
	<p>"Double-click to edit a todo"</p>
	<p>"Created with "<a href="https://github.com/marcuswestin/fun">"Fun"</a>" by "<a href="http://marcuswest.in">"Marcus Westin"</a></p>
</footer>
