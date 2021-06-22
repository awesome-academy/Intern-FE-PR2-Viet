import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Pagination, Input, Button, Modal, Spin } from "antd";

import { getListUser, deleteUser } from "../../../redux/actions";
import { FaTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import ModalCreate from "./ModalCreate";
import ModalModify from "./ModalModify";
import "./style.scss";

const ListUser = ({ deleteUser, getListUser, listUser, adminCreate, userEdit }) => {
    const [current, setCurrent] = useState(1);
    const [isDeleted, setIsDeleted] = useState(false);
    const [search, setSearch] = useState("");
    const [searchKey, setSearchKey] = useState();
    const typingTimeoutRef = useRef(null);
    const { t } = useTranslation();

    useEffect(() => {
        getListUser({
            page: current,
            limit: 10,
            search: searchKey,
        });
    }, [current, adminCreate, isDeleted, userEdit, searchKey]);

    const { Search } = Input;

    const handleChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            const formValue = {
                search: value,
            };
            setSearchKey(formValue.search);
            setCurrent(1);
        }, 1000);
    };

    function confirm(data) {
        Modal.confirm({
            title: "Confirm",
            content: `Do you want to delete this user ${data.email} ?`,
            cancelText: "CANCEL",
            okText: "OK",
            onOk() {
                deleteUser({ id: data.id });
                setIsDeleted(!isDeleted);
            },
            onCancel() {},
        });
    }

    return (
        <>
            <section className="admin__listUser">
                <div className="container">
                    <div className="admin__listUser--btn">
                        <div className="admin__listUser--btn-search">
                            <Search
                                placeholder="search a user"
                                value={search}
                                onChange={handleChange}
                                enterButton
                            />
                        </div>
                        <div className="admin__listUser--btn-create">
                            <ModalCreate setIsDeleted={setIsDeleted} />
                        </div>
                    </div>
                    <div className="admin__listUser--tableNormal">
                        <table>
                            <thead>
                                <tr>
                                    <td>STT</td>
                                    <td>{t("admin.table.name")}</td>
                                    <td>EMAIL</td>
                                    <td>{t("admin.table.address")}</td>
                                    <td>{t("admin.table.phone")}</td>
                                    <td>{t("admin.table.action")}</td>
                                </tr>
                            </thead>
                            <tbody>
                                {listUser[0]?.map((item, index) => (
                                    <>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.address}</td>
                                            <td>{item.phone}</td>
                                            <td>
                                                <div>
                                                    <ModalModify item={item} />
                                                    <Button type="primary" onClick={() => confirm(item)}>
                                                        <FaTrashAlt />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="admin__listUser--pagination">
                        <Pagination
                            current={current}
                            onChange={(page) => setCurrent(page)}
                            total={listUser[1]}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

const mapStateToProps = (state) => {
    const { listUser, deleteUser, adminCreate, userEdit, isLoading } = state.accountReducer;
    return {
        listUser,
        deleteUser,
        adminCreate,
        userEdit,
        isLoading,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getListUser: (params) => dispatch(getListUser(params)),
        deleteUser: (params) => dispatch(deleteUser(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);
