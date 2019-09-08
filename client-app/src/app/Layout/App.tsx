import React, {useState, useEffect,Fragment, SyntheticEvent} from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../Models/activity';
import NavBar from '../../Features/Nav/NavBar';
import ActivityDashboard from '../../Features/Activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';







const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([])
  const [SelectedActivity, SetSelectedActivity] = useState<IActivity | null>(null)

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectedActivity = (id: string) => {
    SetSelectedActivity(activities.filter(a => a.id === id)[0])
    setEditMode(false)
  };

  const handleOpenCreatForm = () => {
    SetSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
        setSubmitting(true)
        agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity])
        SetSelectedActivity(activity)
        setEditMode(false)
      }).then(() => setSubmitting(false))
      
    
   
  }

  const handleEditActivity = (activity: IActivity) => {
      setSubmitting(true)
      agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity])
      SetSelectedActivity(activity)
      setEditMode(false)
    }).then(() => setSubmitting(false))
   
  }

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement> ,id: string) => {
      setSubmitting(true)
      setTarget(event.currentTarget.name)
      agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)])
    }).then(() => setSubmitting(false))
    
  }

  useEffect(() => {
        agent.Activities.list()
        .then(response =>{
        let activities: IActivity[] = [];
        response.forEach((activity) => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      })

      setActivities(activities)
    }).then(() => setLoading(false))
    
  },[]);

  if (loading) return <LoadingComponent content='Loading activities...'/> 

  return (
    <Fragment>
     <NavBar openCreateForm={handleOpenCreatForm} />

     <Container style={{marginTop: '7em'}}>
        <ActivityDashboard activities={activities} SelectActivity={handleSelectedActivity}
                            SelectedActivity={SelectedActivity}
                            editMode={editMode}
                            setEditMode={setEditMode}
                            SetSelectedActivity={SetSelectedActivity}
                            createActivity={handleCreateActivity}
                            editActivity={handleEditActivity}
                            deleteActivity={handleDeleteActivity}
                            submitting={submitting}
                            target={target} />
    </Container>
       
      
    </Fragment>
  );
  
}

export default App;
