import * as React from "react";
import styled from "styled-components";
import EntityMemberLine from "./EntityMemberLine";
import BlockInput from "../BlockInput";
import { EntityMember } from "../../../../../core/domain";
import { newId, sanitizeWhiteSpace, UUID } from "../../../../../core/utils";

const Container = styled.div`
    margin-top: 10px;
`;

const NewMemberInput = BlockInput.extend`
    width: calc(100% - 32px);

    &:not(:focus) {
        border-style: dashed;
    }

    &:not(:focus):not(:hover) {
        background: rgba(255, 255, 255, 0.5);
    }
`;

export default class EntityMemberList extends React.Component<Props, State> {
    state: State = { newMemberName: "" };
    newMemberInput: HTMLInputElement | null = null;

    updateNewMemberName = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({ newMemberName: e.currentTarget.value });
    };

    createNewMember = () => {
        const newMemberName = sanitizeWhiteSpace(this.state.newMemberName);
        if (newMemberName !== "") {
            this.setState({ newMemberName: "" });
            this.props.createEntityMember({
                id: newId(),
                name: newMemberName
            });
        }
    };

    updateMember = (member: EntityMember, newName: string) => {
        this.props.updateEntityMember({
            ...member,
            name: newName
        });
    };

    render() {
        const { entityMembers } = this.props;

        return (
            <Container>
                {entityMembers.map(member => (
                    <EntityMemberLine
                        key={member.id}
                        member={member}
                        updateMemberName={newName => this.updateMember(member, newName)}
                        deleteMember={() => this.props.deleteEntityMember(member.id)}
                        deleteMemberButtonTitle={this.props.deleteEntityMemberButtonTitle}
                    />
                ))}

                <NewMemberInput
                    value={this.state.newMemberName}
                    innerRef={ref => (this.newMemberInput = ref)}
                    onChange={this.updateNewMemberName}
                    onBlur={this.createNewMember}
                    onKeyDown={e => {
                        if (
                            (this.state.newMemberName !== "" && (e.key === "Tab" && !e.shiftKey)) ||
                            e.key === "Enter"
                        ) {
                            e.preventDefault();

                            if (this.newMemberInput !== null) {
                                this.newMemberInput.blur();
                            }

                            window.setTimeout(() => {
                                if (this.newMemberInput !== null) {
                                    this.newMemberInput!.focus();
                                }
                            });
                        } else if (e.key === "Escape") {
                            this.setState({ newMemberName: "" }, () => {
                                if (this.newMemberInput !== null) {
                                    this.newMemberInput.blur();
                                }
                            });
                        }
                    }}
                    placeholder={this.props.addNewMemberPlaceholder}
                />
            </Container>
        );
    }
}

interface Props {
    entityMembers: EntityMember[];
    addNewMemberPlaceholder: "New attribute" | "New method";
    deleteEntityMemberButtonTitle: "Delete attribute" | "Delete method";
    createEntityMember: (member: EntityMember) => void;
    updateEntityMember: (member: EntityMember) => void;
    deleteEntityMember: (memberId: UUID) => void;
}

interface State {
    newMemberName: string;
}
