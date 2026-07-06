package com.kozen.kpm.task.entity;

public class TaskUserStatsEntity {
    private Long total;
    private Long mine;
    private Long waiting;
    private Long completed;

    public Long getTotal() { return total; }
    public void setTotal(Long total) { this.total = total; }
    public Long getMine() { return mine; }
    public void setMine(Long mine) { this.mine = mine; }
    public Long getWaiting() { return waiting; }
    public void setWaiting(Long waiting) { this.waiting = waiting; }
    public Long getCompleted() { return completed; }
    public void setCompleted(Long completed) { this.completed = completed; }
}
