import{j as e}from"./main-C57w9WFt.js";const a={title:"How to run a better development team",date:"2023-02-05",slug:"estimating-work"};function i(n){const t={em:"em",h3:"h3",li:"li",ol:"ol",p:"p",...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.p,{children:"I'm finally publishing an old draft I found. It's really about frustrations with sprint / kanban / estimations / planning processes. I'm not sure how coherent it is, or even if I still agree with all the points, so expect some cleanup edits in the future."}),`
`,e.jsx(t.h3,{children:"Waterfall < scrum < kanban. Kanban or something similar will smaller discrete chunks will be even better."}),`
`,e.jsx(t.p,{children:"Waterfall planning forces infrequent deadlines, possibly on an irregular cadence. Maybe six weeks, six months, or a year."}),`
`,e.jsx(t.p,{children:"Scrum typically results in biweekly deadlines."}),`
`,e.jsx(t.p,{children:"Kanban is an interesting hybrid of daily deadlines and flexible deadlines."}),`
`,e.jsx(t.p,{children:"But we can do better!"}),`
`,e.jsx(t.p,{children:'There are only 2 caveats I know of to the "shorter cycles is better" mantra:'}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"There's a tipping point where the time spent doing fixed-length clerical work (like creating pull requests per change) will outweigh the time saved by shipping short, flexible increments. I haven't found it, but it exists. That tipping point can be moved with lean, fast processes."}),`
`,e.jsx(t.li,{children:"There's a legit benefit to visualizing and planning work in larger arcs than the actual production cycles. That doesn't make short cycle times bad, but there could be tension here. If, say, I'm getting a review, testing, and deploying every time I change a line of code, then it's possible I'd be incentivized to make a series of short term decisions that add up to an untenable whole."}),`
`]}),`
`,e.jsx(t.h3,{children:"When estimating, don’t use the fibonacci sequence."}),`
`,e.jsx(t.p,{children:"The good things about the fibonacci sequence are: it forces you to use broad strokes, and it respects that larger problems come with larger unknowns."}),`
`,e.jsx(t.p,{children:"But I can’t visualize the number thirteen. I can’t, off the cuff, intuit the relative difference between eight and thirteen. Most people can’t, and most sprint planning meetings devolve at some point into people nitpicking whether a task is a five or eight or thirteen. What a bunch of assholes."}),`
`,e.jsx(t.p,{children:"You know what I can estimate fast, without a lot of hand-wringing and self doubt? If something seems easy, medium or hard."}),`
`,e.jsx(t.p,{children:"A great method for fast, approximately granular estimates is:"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"Ask the team if something is easy, medium, or hard."}),`
`,e.jsx(t.li,{children:"Then ask them if, within their original choice, it’s a little more on the easy, medium, or hard side."}),`
`]}),`
`,e.jsxs(t.p,{children:["So you’ll come up with a range of: it’s ",e.jsx(t.em,{children:"easy"})," easy, it’s a little on the harder than a medium task, or it’s straight-up hard, but not especially so."]}),`
`,e.jsx(t.p,{children:"That’s a nine-point scale. That gets you from one to fifty-five in fibonacci. And anyone can do it with no training, and very little stress."}),`
`,e.jsx(t.h3,{children:"Managers should be data scientists."}),`
`,e.jsx(t.p,{children:"Lots of the woes of working on large teams are because these groups of stakeholders want different things: creators (workers) want to do their best work without worrying about being late. Product owners want their features fast. Engineering managers want their teams to exceed expectations on quality and velocity and don't want to be constantly explaining why projects are past due."}),`
`,e.jsx(t.p,{children:"This is a terrible situation in which to ask people for accurate estimates. There will always be competing pressures pushing to expand or contract project timelines. We should take a cue from psychology research - you don't just ask your test subjects their opinions and take that as gospel. What people do matters more than what they say and think they will do, and reconciling those two things is a separate problem from predicting people's actual actions."}),`
`,e.jsx(t.p,{children:"Estimates of how long a piece of work will actually take in calendar time ..."}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"... should be inferred as much as possible from indirect data,"}),`
`,e.jsx(t.li,{children:"... should not be fed directly back to the people doing the work,"}),`
`,e.jsx(t.li,{children:"... and should be done by managers, project managers, or data scientists, not the engineers themselves."}),`
`]}),`
`,e.jsx(t.h3,{children:"Don’t estimate your own stories."}),`
`,e.jsx(t.p,{children:"You can’t be unbiased about work you expecting to do. Your product manager and scrum master can’t be unbiased about work they have to deliver to customers."}),`
`,e.jsx(t.p,{children:"I'm proposing that project planning (how will we do this) be performed by a group of engineers and executed on in a continuous fashion, while a different person or group estimates (how long will it take) and reports up."}),`
`,e.jsxs(t.p,{children:["You know who can be unbiased? People who have no stake. So, swap the work of estimation with another team. Swap estimations with a friend. Pay a contractor ",e.jsx(t.em,{children:"just to provide estimates"}),". You’ll get better data."]}),`
`,e.jsx(t.h3,{children:"Breaking down big tasks is a real job in and of itself."}),`
`,e.jsx(t.p,{children:"Some of those estimates are gonna be hard to swallow."}),`
`,e.jsxs(t.p,{children:["But you know what, if a task is a ",e.jsx(t.em,{children:"large"})," large, a good ",e.jsx(t.em,{children:"easy"})," step is to cut scope or break it down. Then send it back for another estimate from your friend or contractor or whomever. That’s better than a planning meeting, right?"]}),`
`,e.jsx(t.h3,{children:"No more deadlines."}),`
`,e.jsx(t.p,{children:"If you don't feed back your estimates to your engineering team, you don't have deadlines. Not biweekly, not quarterly. Your engineers have working-on lists, not to-do lists."}),`
`,e.jsx(t.p,{children:"If the sales team, product owner, or some other stakeholder wants it faster, literally the only thing to do is ask for it without all the original planned features. I'll admit, the first time I realized this is stressed me out a bit; but when I thought about it a second time, I realized this is literally always true. You either have crunch time, or cutting scope."}),`
`,e.jsx(t.p,{children:"I realize this defies the conventional wisdom that a sense of urgency produces better work. I'm not sure if I agree with the conventional wisdom here. Personally, if I have stakeholders asking me to launch a feature with less polish than I want, I feel motivated to do as much as I can with the time I have; but I'm not sure how reliable my gut is here."})]})}function o(n={}){const{wrapper:t}=n.components||{};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{o as default,a as frontmatter};
