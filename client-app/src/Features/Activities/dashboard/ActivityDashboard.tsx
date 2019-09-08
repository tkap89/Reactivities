import React from 'react'
import { Grid, List } from 'semantic-ui-react';
import { IActivity } from '../../../app/Models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../Details/ActivityDetails';
import ActivityForm from '../Form/ActivityForm';


interface IProps{
    activities: IActivity[];
    SelectActivity: (id: string)=> void;
    SelectedActivity: IActivity |null;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    SetSelectedActivity: (activity: IActivity | null) => void;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity: IActivity) => void;
    deleteActivity: (id: string) => void;
}

const ActivityDashboard: React.FC<IProps> = ({
    activities,
    SelectActivity,
    SelectedActivity,
    editMode,
    setEditMode,
    SetSelectedActivity,
    createActivity,
    editActivity,
    deleteActivity
    }) => {

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities} SelectActivity={SelectActivity} deleteActivity={deleteActivity}/>
            </Grid.Column>

            <Grid.Column width={6}>
              {SelectedActivity && !editMode && <ActivityDetails Activity={SelectedActivity} setEditMode={setEditMode} SetSelectedActivity={SetSelectedActivity} />}

              {editMode  && ( <ActivityForm
              key={SelectedActivity && SelectedActivity.id || 0} 
              setEditMode={setEditMode}
              activity={SelectedActivity!}
              createActivity={createActivity}
              editActivity={editActivity}
              />)}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard
