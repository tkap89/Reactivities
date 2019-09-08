import React from 'react'
import { Card, Icon, Image, ButtonGroup, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/Models/activity';

interface IProps{
    Activity: IActivity;
    setEditMode: (editMode: boolean) => void;
    SetSelectedActivity: (activity: IActivity | null) => void
}

const ActivityDetails: React.FC<IProps> = ({Activity, setEditMode, SetSelectedActivity }) => {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${Activity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
            <Card.Header>{Activity.title}</Card.Header>
            <Card.Meta>
                <span>{Activity.date}</span>
            </Card.Meta>
            <Card.Description>
                {Activity.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}> 
                    <Button onClick = {() => setEditMode(true)} basic color='blue' content='Edit'/>
                    <Button onClick={()=> SetSelectedActivity(null)} basic color='red' content='Cancel'/>
                </Button.Group>
        </Card.Content>
    </Card>
    )
}

export default ActivityDetails
