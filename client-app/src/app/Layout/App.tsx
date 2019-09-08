import React, {useState, useEffect,Fragment} from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../Models/activity';
import NavBar from '../../Features/Nav/NavBar';
import ActivityDashboard from '../../Features/Activities/dashboard/ActivityDashboard';







const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([])
  const [SelectedActivity, SetSelectedActivity] = useState<IActivity | null>(null)

  const [editMode, setEditMode] = useState(false);

  const handleSelectedActivity = (id: string) => {
    SetSelectedActivity(activities.filter(a => a.id === id)[0])
    setEditMode(false)
  };

  const handleOpenCreatForm = () => {
    SetSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity])
    SetSelectedActivity(activity)
    setEditMode(false)
  }

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity])
    SetSelectedActivity(activity)
    setEditMode(false)
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)])
  }

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities').then((response) =>{
      let activities: IActivity[] = [];
      response.data.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      })

      setActivities(response.data)
    })
    
  },[]);

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
                            deleteActivity={handleDeleteActivity} />
    </Container>
       
      
    </Fragment>
  );
  
}

export default App;
